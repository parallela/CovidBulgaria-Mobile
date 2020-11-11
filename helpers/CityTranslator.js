const cities = {
    "Благоевград": "Blagoevgrad",
    "Варна": "Varna",
    "Габрово": "Gabrovo",
    "Ловеч": "Lovech",
    "Перник": "Pernik",
    "Плевен": "Pleven",
    "София": "Sofia",
    "Смолян": "Smolyan",
    "Велико Търново": "Veliko Tarnovo",
    "Бургас": "Burgas",
    "Пловдив": "Plovdiv",
    "Добрич": "Dobrich",
    "Шумен": "Shumen",
    "Пазарджик": "Pazardjik",
    "Стара загора": "Stara zagora",
    "Сливен": "Sliven",
    "Хасково": "Haskovo",
    "Кърджали": "Kurdjali",
    "Кюстендил": "Kyustendyl",
    "Силистра": "Silistra",
    "Русе": "Ruse",
    "Монтана": "Montana",
    "Враца": "Vratsa",
    "Видин": "Vidin",
    "Ямбол": "Yambol",
    "Разград": "Razgrad",
    "Търговище": "Turgovishte"
};

export const translateCity = city => {

    const cyrillicPattern = /^[\u0400-\u04FF]+$/;


    const tCity = Object.keys(cities).find(key => cities[key] === city);

    /**
     * Check if the city is already in cyrillic
     */
    if (cyrillicPattern.test(city)) {
        return city;
    }

    return tCity;
}