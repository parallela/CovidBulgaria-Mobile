export const translateCity = city => {
    const cities = {
        "Благоевград": "Blagoevgrad",
        "Варна": "Varna",
        "Габрово": "Gabrovo",
        "Ловеч": "Lovech",
        "Перник": "Pernik",
        "Плевен": "Pleven",
        "София": "Sofia",
        "Смолян": "Smolyan",
        "Велико Търново": "Veliko Turnovo",
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
        "Ямбол": "Qmbol",
        "Разград": "Razgrad",
        "Търговище": "Turgovishte"
    };
    const tCity = Object.keys(cities).find(key => cities[key] === city);

    return tCity;
}
