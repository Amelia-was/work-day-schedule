// global variables
var today = moment().format('dddd, MMMM Do YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

console.log(moment().format('h a'));

events = JSON.parse(localStorage.getItem("events"));

if (!events) {
    // default event objects
    var hour9 = {
        hr: moment().set("hour", 9),
        event: ""
    }
    var hour10 = {
        hr: moment().set("hour", 10),
        event: ""
    }
    var hour11 = {
        hr: moment().set("hour", 11),
        event: ""
    }
    var hour12 = {
        hr: moment().set("hour", 12),
        event: ""
    }
    var hour13 = {
        hr: moment().set("hour", 13),
        event: ""
    }
    var hour14 = {
        hr: moment().set("hour", 14),
        event: ""
    }
    var hour15 = {
        hr: moment().set("hour", 15),
        event: ""
    }
    var hour16 = {
        hr: moment().set("hour", 16),
        event: ""
    }
    events = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16];
}

/* KEEP THiS */

/*
localStorage.setItem("notes", $("#notes").val());
var savedNote = localStorage.getItem("notes");
console.log(savedNote);
var savedNote = localStorage.getItem("notes");
$("#notes").text = savedNote;*/

// notepad
$("#notes").on("blur", function () {
    localStorage.setItem("notes", $("#notes").val());
}
)

var updateTimes = function(events) {
    if (moment(events[7].hr).isBefore(moment(), 'day')) {
        for (var i = 0; i < events.length; i++) {
            events[i].hr = moment().set("hour", (i+9));
        }
    }
}

// check events
// change colour for past, present, future events
var checkEvents = function (eventsArray) {
    for (var i = 0; i < eventsArray.length; i++) {
        var currID = "#" + (i + 9);
        if (moment(events[i].hr).isSame(moment(), 'hour')) {
            //console.log(moment(events[i].hr).format('h a'));
            //console.log("is in the present");
            $(currID).removeClass("future");
            $(currID).removeClass("past");
            $(currID).addClass("present");
        }
        else if (moment(events[i].hr).isBefore(moment(), 'hour')) {
            //console.log(moment(events[i].hr).format('h a'));
            //console.log("is in the past");
            $(currID).removeClass("present");
            $(currID).removeClass("future");
            $(currID).addClass("past");
        }
        else {
            ///console.log(moment(events[i].hr).format('h a'));
            //console.log("is in the future");
            $(currID).removeClass("past");
            $(currID).removeClass("present");
            $(currID).addClass("future");
        }
    }
}

// save events
// get text from each timeblock
// save to array of objects
// save them to local storage
var saveEvents = function() {
    $(".time-block").each(function(index) {
        events[index].event = $(this).text();
        events[index].hr = moment().set("hour", (index + 9));
        $(this).attr('id', (index + 9));
    });

    //console.log(events);

    localStorage.setItem("events", JSON.stringify(events));

};

// load events
// get events from local storage 
// update timeblocks with event text
var loadEvents = function () {
    $(".time-block").each(function (index) {
        $(this).text(events[index].event);
    });
    checkEvents(events);

    // load notes
    var savedNote = localStorage.getItem("notes");
    $("#notes").val(savedNote);
}

// click listener for time block div element
$(".row").on("click", ".time-block", function () {
    var currEventIndex = parseInt($(this).attr('id')) - 9;
    // only allow editing for present/future events
    if (!(moment(events[currEventIndex].hr).isBefore(moment(), 'hour'))) {
        var timeClass = " future";
        if (moment(events[currEventIndex].hr).isSame(moment(), 'hour')) {
            timeClass = " present"
        }
        // get text from <div> element
        var text = $(this)
            .text()
            .trim();

        // change to form input
        var textInput = $("<textarea>")
            .addClass("inherit-height pt-3 col-10 border-x-2" + timeClass)
            .val(text);

        $(this).replaceWith(textInput);
        // automatically select text
        textInput.trigger("select");
    }
});

// replace event text with new input
$(".row").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    // recreate div element
    var newEvent = $("<div>")
        .addClass("time-block col-10 border-x-2 text-left pt-3")
        .text(text);

    // replace textarea with div element
    $(this).replaceWith(newEvent);

    saveEvents();
    checkEvents(events);
});

// clear all events
$("#clear").on("click", function () {
    $(".time-block").each(function(index) {
        $(this).text("");
        saveEvents();
    })
});

updateTimes(events);
loadEvents();



