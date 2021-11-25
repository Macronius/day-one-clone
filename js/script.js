//CONSTANTS && EVENT LISTENERS

const addText = document.getElementById('add-text')
addText.addEventListener("click", ()=> {
    // console.log("new text clicked")
    openNewEntry();
})

const rightHeadDate = document.getElementById('right-head-date')

const metadataTime = document.getElementById('metadata-time')
const metadataTemp = document.getElementById('metadata-temp')
const metadataAddress = document.getElementById('metadata-address')
const metadataName = document.getElementById('metadata-name')


const entryList = document.getElementById("section-list")

const entryDone = document.getElementById("done")
entryDone.addEventListener("click", ()=> {
    console.log('done button pressed')
    // const newEntry = createListEntryContainerDiv()
    // entryList.appendChild(newEntry)
})





//FUNCTIONS
const openNewEntry = ()=> {
    let paramCollector = {
        address: '',
        temp: '',
        forecast: '',
        altitude: '',
        time: '',
        day: '',
        date: '',
        entryTitle: '',
        entry: '',
    }

    const posData = navigator.geolocation.getCurrentPosition(dateSuccess, console.log)
}



const dateSuccess = (position)=> {
    const timestamp = position.timestamp
    const date = new Date(timestamp)
    console.log("date: ", date)
    const cutDate = date.toDateString()
    console.log("cutDate: ", cutDate)

    const day = date.getDay(); console.log(day)
    const dateNum = date.getDate(); console.log(dateNum)

    //NOTE: this is extra and does not have to be in this function
    const time = new Date().toLocaleString()
    const cutTime = time.slice(-11)

    const posCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    setDataToDOM(metadataTime, cutTime)
    setDataToDOM(rightHeadDate, cutDate)

    const weatherJson = getWeatherData(posCoords)
    console.log("typeof(weatherJson): ", weatherJson)
}


const setDataToDOM = (elementConst, arg)=> {
    elementConst.innerHTML = `${arg}`
    // console.log(`${elementConst}.innerHTML = ${arg}`)
}
const newEntryToDOM = (elementConst)=> {
    elementConst.innerHTML = ""
}

//NOTE: i think this needs a parameter to receive an argument in order to work
const setFocusOnNewEntry = ()=> {
    document.getElementById().focus()
}

const createElem = (elemType, divClassName, divText)=> {
    const div = document.createElement(elemType)
    div.className = divClassName
    if(divText) {
        div.textContent = divText
    }
    return div
}

const getWeatherData = async(posCoords)=> {
    const lat = posCoords.lat.toFixed(2)
    const lon = posCoords.lon.toFixed(2)
    const WEATHER_API_KEY = "d5a66b7fb5ed2e1b41c90d3f7c156f1f"

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`

    try{
        const weatherStream = await fetch(url)
        const weatherJson = await weatherStream.json()
        // console.log(weatherJson)

        const temp =  await Math.floor((weatherJson.main.temp - 273)*9/5 + 32)
        // console.log(`${temp} from within getWeatherData function`)
        const tempFormatted = `${temp}°F`
        setDataToDOM(metadataTemp, tempFormatted)
        return temp
    }
    catch(err){
        console.log(err.stack)
    }
}






//CREATE THE ENTRY ENGINE
const createListEnttryContainerDiv = (params)=> {
    const listContainer = createElem("div", "list-container")

    const entryDate = createElem("div", "entry-date", 'July ###')

    listContainer.appendChild(entryDate)

    const entry = createElem("div", "entry")
    const entryContainerLeft = createElem("div", "entry-content-left")
    const entryTitle = createElem("div", "entry-title", "sample journal entry name ___")
    entryContentLeft.appendChild(entryTitle)

    const entryActual = createElem("div", "entry-actual", "lorem ipsum dolor sit amet consetetur adipsicing elit.")
    entryContentLeft.appendChild(entryActual)

    const day = createElem("div", "day", "Thu###")
    const date = createElem("div", "date", "01##")

    const calendarDay = createElem("div", "calendar-day")
    calendarDay.appendChild(day)
    calendarDay.appendChild(date)
    
    const entryContentRight = createElem("div", "entry-content-right")
    entryContentRight.appendChild(calendarDay)

    entry.appendChild(entryContentLeft)
    entry.appendChild(entryContentRight)

    listContainer.appendChild(entry)

    const entryMetadata = createElem("div", "entry-metadata")

    const entryMetadataLeft = createElem("div", "entry-metadata-left");
    const entryMetadataAddress = createElem("div", "entry-metadata-address", "1507 kinney ave###");
    const entryMetadataWeather = createElem("div", "entry-metadata-weather", "92oF Sunny ###");
    entryMetadataLeft.appendChild(entryMetadataAddress);
    entryMetadataLeft.appendChild(entryMetadataWeather);

    const entryMetadataRight = createElem("div", "entry-metadata-right");
    const entryMetadataTime = createElem("div", "entry-metadata-time", "15:00###");
    entryMetadataRight.appendChild(entryMetadataTime);

    entryMetadata.appendChild(entryMetadataLeft);
    entryMetadata.appendChild(entryMetadataRight);

    listContainer.appendChild(entryMetadata);

    return listContainer;
}