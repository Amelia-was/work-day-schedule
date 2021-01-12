// global variables
var today = moment().format('dddd, MMMM Do YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

events = JSON.parse(localStorage.getItem("events"));

if (!events) {
    // default event objects
    var hour9 = {
        hr: moment().hour(9).startOf('hour'),
        event: ""
    }
    var hour10 = {
        hr: moment().hour(10).startOf('hour'),
        event: ""
    }
    var hour11 = {
        hr: moment().hour(11).startOf('hour'),
        event: ""
    }
    var hour12 = {
        hr: moment().hour(12).startOf('hour'),
        event: ""
    }
    var hour13 = {
        hr: moment().hour(13).startOf('hour'),
        event: ""
    }
    var hour14 = {
        hr: moment().hour(14).startOf('hour'),
        event: ""
    }
    var hour15 = {
        hr: moment().hour(15).startOf('hour'),
        event: ""
    }
    var hour16 = {
        hr: moment().hour(16).startOf('hour'),
        event: ""
    }
    events = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16];
}

/* KEEP THiS */

/*
localStorage.setItem("notes", $("#notes").val());
var savedNote = localStorage.getItem("notes");
console.log(savedNote);
$("#notes").text = savedNote;*/

/* KEEP THiS */

// save events
// get text from each timeblock
// save to array of objects
// save them to local storage
var saveEvents = function() {
    $(".time-block").each(function(index) {
        events[index].event = $(this).text();
        events[index].hr = moment().hour(index + 9).startOf('hour');
    });

    console.log(events);

    localStorage.setItem("events", JSON.stringify(events));

};

// load events
// get events from local storage 
// update timeblocks with event text
var loadEvents = function () {
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

console.log(events);

// check events
// change colour for past, present, future events
var checkEvents = function (eventsArray) {
    for (var i = 0; i < eventsArray.length; i++) {
        console.log(moment(events[i].hr).isBefore(moment().startOf('hour')))
        console.log("before now oclock");
    }
}

checkEvents(events);
