const selectCountry = document.querySelector('#country');

const americanStates = ["Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California", 
  "Colorado", 
  "Connecticut", 
  "Delaware", 
  "Florida", 
  "Georgia", 
  "Hawaii", 
  "Idaho", 
  "Illinois", 
  "Indiana", 
  "Iowa", 
  "Kansas", 
  "Kentucky", 
  "Louisiana", 
  "Maine", 
  "Maryland", 
  "Massachusetts", 
  "Michigan", 
  "Minnesota", 
  "Mississippi", 
  "Missouri", 
  "Montana", 
  "Nebraska", 
  "Nevada", 
  "New Hampshire", 
  "New Jersey", 
  "New Mexico", 
  "New York", 
  "North Carolina", 
  "North Dakota", 
  "Ohio", 
  "Oklahoma", 
  "Oregon", 
  "Pennsylvania", 
  "Rhode Island", 
  "South Carolina", 
  "South Dakota", 
  "Tennessee", 
  "Texas", 
  "Utah", 
  "Vermont", 
  "Virginia", 
  "Washington", 
  "West Virginia", 
  "Wisconsin", 
  "Wyoming"]

  const hungarianCounties = ["Bács-Kiskun megye",
     "Baranya megye",
     "Békés megye",
     "Borsod-Abaúj-Zemplén megye",
     "Csongrád-Csanád megye",
     "Fejér megye",
     "Győr-Moson-Sopron megye",
     "Hajdú-Bihar megye",
     "Heves megye",
     "Jász-Nagykun-Szolnok megye",
     "Komárom-Esztergom megye",
     "Nógrád megye",
     "Pest megye",
     "Somogy megye",
     "Szabolcs-Szatmár-Bereg megye",
     "Tolna megye",
     "Vas megye",
     "Veszprém megye",
     "Zala megye"]

const toggleStates = () => {
  const selectState = document.querySelector('#state');
  selectState.innerHTML = '';
  selectState.insertAdjacentHTML('afterbegin', '<option selected>Choose...</option>');

  const country = selectCountry.value;
  const stateList = country === 'usa' ? americanStates : country === 'hun' ? hungarianCounties : []
  const htmlString = stateList.map(state => `<option value="${state}">${state}</option>`).join('');
  selectState.insertAdjacentHTML('beforeend', htmlString)
}

selectCountry.addEventListener('change', toggleStates)