// Capturing the elements where we will append the data we will fetch from the API

// As the return of getDate() is a zero index based, we made an array to be able to get the day
let daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// As the return of getMonth() is a zero index based, we made an array to be able to get the month
let monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// To treat the date
let now = new Date();

// The city input of the user
let prayerInput = document.querySelector("input");
// The country Input of the user
let countryName = document.querySelector(".country");
// The submit button
let submitBtn = document.querySelector(".submit");
// Here the div that treats the whole date of today shown on the screen
let prayerDate = document.querySelector(".prayer-date");
// In the upcoming three divs we are just putting the day, date and month
let day = document.querySelector(".day");
let date = document.querySelector(".date");
let month = document.querySelector(".month");
// Here is the div that will show the city that the user inserted in the input field
let prayerCity = document.querySelector(".city");
// Here catching the div of each prayer
let fajr = document.querySelector(".fajr");
let sherooq = document.querySelector(".sherooq");
let zhur = document.querySelector(".zhur");
let asr = document.querySelector(".asr");
let maghrib = document.querySelector(".maghrib");
let isha = document.querySelector(".isha");
// The div that will show the error message in case it appears
let errorMSG = document.querySelector(".city-p");

// Default data that will appear once the user open the page
fetchPrayer();

// Function to show all the data of the prayers in the page
showdata();

function showdata() {
    // We will get the day of today by the getDate() method but as it is a zero index, we had to make an array to show the exact day
    day.innerHTML = daysArray[now.getDay()];
    // We will get the date of today
    date.innerHTML = now.getDate();
    // We will get the month of today by the getMonth() method but as it is a zero index, we had to make an array to show the exact Month
    month.innerHTML = monthsArray[now.getMonth()];
    // We show the name of the city that the user inserted and in case if he didn't insert any, the default value will be Cairo
    prayerCity.innerHTML = prayerInput.value || "Cairo";
}

// The function that we will be executed once we click on the submit button
submitBtn.onclick = () => {
    // Once we fetch the data, we show the data based on the json data that is returned
    showdata();
    // Here we will fetch the URL of the prayer time, the link needs two parameters at least which are the city and country names
    fetchPrayer(prayerInput.value, countryName.value);
};

// The function of fetching the data from the URL and accepting the two parameters, with also default values in case if nothing was inserted
function fetchPrayer(city = "Cairo", country = "Egypt") {
    // Fetching the URL
    fetch(
        `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=5&month=05&year=2017`
    )
        // Extracting the object from the response
        .then((response) => response.json())
        // Here we dea, with the data object
        .then((data) => {
            // Here we got the object that has the dates of the prayers, I saved it in a variable to make the code more readable
            let prayerTiming = data.data[0].timings;
            // In the upcoming lines we are just inserting the date of each prayer in it's designated div
            fajr.innerHTML = prayerTiming.Fajr;
            sherooq.innerHTML = prayerTiming.Sunrise;
            zhur.innerHTML = prayerTiming.Dhuhr;
            asr.innerHTML = prayerTiming.Asr;
            maghrib.innerHTML = prayerTiming.Maghrib;
            isha.innerHTML = prayerTiming.Isha;
        })
        // In case of error, we just show a message for the user that we can't get the location inserted and for him to put the correct one
        .catch((error) => {
            window.alert(`Sorry, Can't read this value (${prayerInput.value})`);
        });
}
