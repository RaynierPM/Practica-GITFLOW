(function () {
    document.addEventListener("DOMContentLoaded", () => {

        const formulario = document.querySelector('form#formAmortizacion');
        function mostrarAmortizacion({monto, interes, plazo}) {     
            let interesMensual = interes/1200;

            let cuota = (interesMensual * monto)/(1-Math.pow((1+interesMensual), -plazo))
            cuota = Math.round(cuota * 100) /100;
            
            

        }

        
        formulario.addEventListener("submit", e => {
            e.preventDefault();
            const datos = new FormData(formulario);

            let monto, interes, plazo = 0;

            try {
                monto = Number.parseFloat(datos.get("monto"));
                interes = Number.parseFloat(datos.get("interes"));
                plazo = Number.parseInt(datos.get("plazo"));
            }catch(error) {
                console.error(error);
                alert("Valores no validos, inserte numeros por favor")
                return
            }
            
            if (monto > 0 &&
                interes > 0 &&
                plazo > 0) {
                let datosNetos = {'monto': monto, 'interes':interes, 'plazo':plazo};
                mostrarAmortizacion(datosNetos);
            }else {
                alert("Valores no validos, inserte nuevamente")
            }
        })





    })
})();