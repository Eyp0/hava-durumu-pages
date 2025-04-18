async function getWeather() {
    console.log('=== Hava Durumu Sorgulama Başladı ===');
    const city = document.getElementById("cityInput").value;
    console.log(`Aranan Şehir: ${city}`);
    
    const url = `https://wttr.in/${city}?format=3`;
    console.log(`API URL: ${url}`);
    
    const weatherResult = document.getElementById("weatherResult");
    const updateTime = document.getElementById("updateTime");
  
    try {
        console.log('Yükleniyor animasyonu gösteriliyor...');
        weatherResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Yükleniyor...</div>';
        
        console.log('API isteği gönderiliyor...');
        const startTime = performance.now();
        const response = await fetch(url);
        const endTime = performance.now();
        console.log(`API yanıt süresi: ${(endTime - startTime).toFixed(2)}ms`);
        
        console.log('API yanıtı alındı, veri işleniyor...');
        const data = await response.text();
        console.log('API Yanıtı:', data);
  
        if (!data) {
            console.error('Şehir bulunamadı hatası!');
            weatherResult.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Şehir bulunamadı.</div>';
            return;
        }
  
        // Hava durumuna göre arka plan rengini ve ikonu ayarla
        const weatherText = data.toLowerCase();
        let weatherCondition = "other";
        let weatherIcon = "wi-day-sunny";
        
        if (weatherText.includes("☀️") || weatherText.includes("clear")) {
            weatherCondition = "clear";
            weatherIcon = "wi-day-sunny";
        } else if (weatherText.includes("🌧️") || weatherText.includes("rain")) {
            weatherCondition = "rain";
            weatherIcon = "wi-rain";
        } else if (weatherText.includes("☁️") || weatherText.includes("cloud")) {
            weatherCondition = "cloudy";
            weatherIcon = "wi-cloudy";
        } else if (weatherText.includes("❄️") || weatherText.includes("snow")) {
            weatherCondition = "snow";
            weatherIcon = "wi-snow";
        } else if (weatherText.includes("🌩️") || weatherText.includes("thunder")) {
            weatherCondition = "thunder";
            weatherIcon = "wi-thunderstorm";
        }
        
        // Arka plan rengini değiştir
        updateBackgroundColor(weatherCondition);
        
        console.log('Son güncelleme zamanı ayarlanıyor...');
        const now = new Date();
        updateTime.textContent = now.toLocaleTimeString('tr-TR');
        console.log(`Son güncelleme: ${now.toLocaleTimeString('tr-TR')}`);
        
        console.log('Hava durumu sonucu gösteriliyor...');
        weatherResult.innerHTML = `
            <div class="weather-data">
                <i class="wi ${weatherIcon} weather-icon"></i>
                <div class="weather-details">
                    ${data}
                </div>
            </div>
        `;
        
        console.log('Arama kutusu temizleniyor...');
        document.getElementById("cityInput").value = "";
        
        console.log('=== Hava Durumu Sorgulama Başarıyla Tamamlandı ===');
        
    } catch (error) {
        console.error('Hata oluştu:', error);
        console.error('Hata detayları:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        weatherResult.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Bir hata oluştu.</div>';
        console.log('=== Hava Durumu Sorgulama Hata ile Sonuçlandı ===');
    }
}

function updateBackgroundColor(weatherCondition) {
    const body = document.body;
    const container = document.querySelector('.container');
    
    // Mevcut sınıfları temizle
    body.className = '';
    container.className = 'container';
    
    // Hava durumuna göre sınıf ekle
    body.classList.add(`weather-${weatherCondition}`);
    container.classList.add(`container-${weatherCondition}`);
    
    console.log(`Arka plan rengi güncellendi: ${weatherCondition}`);
}

// Enter tuşu ile arama yapma
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        console.log('Enter tuşu ile arama tetiklendi');
        getWeather();
    }
});

// Sayfa yüklendiğinde konsola bilgi mesajı
console.log('Hava Durumu Uygulaması başlatıldı');
console.log('Uygulama hazır ve kullanıma hazır');
  