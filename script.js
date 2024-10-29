// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class workout {
    date = new Date();
    id = (new Date() + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}
class Running extends workout {
    constructor(coords, distance, duration, cadence) {}


}
class Cycling extends workout {}

class App {
    _map;
    _mapEvent;
    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField)
    }
    _getPosition() {

        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
                alert('Could not get your position');
            });

    }

    _loadMap(position) {

        const { latitude } = position.coords;
        const { longitude } = position.coords;

        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude, longitude]
        this._map = L.map('map').setView(coords, 13);
        // console.log(map);


        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);


        //  ---handling  clicks on map
        this._map.on('click', this._showForm.bind(this))

    }

    _showForm(mapE) {
        this.mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();

    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    _newWorkout(e) {
        e.preventDefault();
        console.log(this);


        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // display marker
        const { lat, lng } = this._mapEvent.latlng;

        L.marker([lat, lng])
            .addTo(this._map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            }))
            .setPopupContent('Workout')
            .openPopup();
    }


}
const app = new App()