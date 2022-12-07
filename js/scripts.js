let main_interval;
let target_distance = 10 * 60 * 1000 + 5100; // min * sec * ms 10 * 60 * 1000
let main_text = document.getElementById("main_text");
let song = document.getElementById("song");
let is_audio_running = true;

function render_time(new_time_ms) {
    let minutes = Math.floor((new_time_ms % 3600000) / 60000);
    let seconds = Math.floor((new_time_ms % 60000) / 1000);
    trailing_zero_for_seconds = "";
    if (seconds < 10) {trailing_zero_for_seconds = "0";}
    main_text.innerHTML = minutes + ":" + trailing_zero_for_seconds + seconds;
}

main_text.onmousedown = function () {
    let interval_start = new Date().getTime();
    let interval_target = interval_start + target_distance;
    render_time(target_distance);
    let printed_time = interval_start - 1000;
    let trailing_zero_for_seconds = "";
    clearInterval(main_interval);

    if (is_audio_running) {
        is_audio_running = false;
        song.play();
    } else {
        is_audio_running = true;
        song.pause();
    }

    main_interval = setInterval(function() {
        let now = new Date().getTime();
        let distance = interval_target - now;
        if (now - printed_time >= 1000) {
            render_time(distance)
            printed_time = now;
        }
        if (distance < 0) {
            clearInterval(main_interval);
            main_text.innerHTML = "GO!";
            song.pause();
        }
    }, 50);
    return true;
};
