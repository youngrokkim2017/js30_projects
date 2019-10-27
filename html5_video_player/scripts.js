// these get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// building out the function
function togglePlay() {
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? 'play icon' : 'pause icon';
    toggle.textContent = icon;

    // console.log('update button');
}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // console.log(this.name);
    // console.log(this.value);

    video[this.name] = this.value;
}

function handleProgress() {
    // updating the flex basis value
    // percentage values...

    const percent = (video.currentTime / video.duration) * 100;
    progressBar.getElementsByClassName.flexBasis = `${percent}%`;

}

function scrub(e) {
    // console.log(e);

    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}




// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', () => {
//     if (mousedown) {
//         scrub();
//     }
// });
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// try to figure out how to make the full size button work