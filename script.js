
document.querySelector('.busca').addEventListener('submit',async(event)=>{
    event.preventDefault(); // previne comportmento padrao do formulario
    let input = document.querySelector('#searchInput').value.trim(); //trim remove campo vazio ou espaços. 

    if (input !== ''){
        showMSG();

        const apiKey = "6893902108cd7bd517c82a27ebc455c1";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await  results.json();

        if (json.cod === 200){
            showInfo({
                //retornando valores do json, ou seja do obejeto. 
                name:json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else{
            clearInfo();
            showMSG('não encontramos as informações');
        }
    }else {
         document.querySelector('.aviso').innerHTML = 'preecha o campo de busca';

    }
}); 

function showInfo(json){
    showMSG('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>Cº</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); // troca atributo padrao pelo json. 
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}


function showMSG(msg = 'carregando...'){
    document.querySelector('.aviso').innerHTML = msg;
}


function clearInfo(){
    showMSG('');
    document.querySelector('.resultado').style.display = 'none';
}


