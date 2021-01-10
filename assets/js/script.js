// global variables
var today = dayjs().format('dddd, MMMM D YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

console.log(dayjs().format('h a'));

// event objects
hour9 = {
    hr: 9,
    event: ""
}
hour10 = {
    hr: 10,
    event: ""
}
hour11 = {
    hr: 11,
    event: ""
}
hour12 = {
    hr: 12,
    event: ""
}
hour13 = {
    hr: 13,
    event: ""
}
hour14 = {
    hr: 14,
    event: ""
}
hour15 = {
    hr: 15,
    event: ""
}
hour16 = {
    hr: 16,
    event: ""
}

// events array
var events = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16];

// save events
// get text from each timeblock
// save to array of objects
// save them to local storage
var saveEvents = function() {
    $(".time-block").each(function(index) {
        events[index].event = $(this).text();
    });

    console.log(events);

    localStorage.setItem("events", JSON.stringify(events));

};

// load events
// get events from local storage 
// update timeblocks with event text
var loadEvents = function () {
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        events = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16];
    }

    $(".time-block").each(function (index) {
        $(this).text(events[index].event);
    });
}

// click listener for time block div element
$(".row").on("click", ".time-block", function () {
    // get text from <div> element
    var text = $(this)
    .text()
    .trim();

    // change to form input
    var textInput = $("<textarea>")
        .addClass("form-control-sm text-light w-75")
        .val(text);

    $(this).replaceWith(textInput);
    // automatically select text
    textInput.trigger("select");
});

// replace event text with new input
$(".row").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    // recreate div element
    var newEvent = $("<div>")
        .addClass("time-block col-10 text-light text-left h-100 pt-3")
        .text(text);

    // replace textarea with div element
    $(this).replaceWith(newEvent);

    saveEvents();
});

// clear all events
$("#clear").on("click", function () {
    $(".time-block").each(function(index) {
        $(this).text("");
        saveEvents();
    })
});

loadEvents();

