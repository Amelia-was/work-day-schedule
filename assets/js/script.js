// global variables
// today's date
var today = moment().format('dddd, MMMM Do YYYY');
var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);
var startTime = 9;

// get events array from localStorage
events = JSON.parse(localStorage.getItem("events"));

if (!events) {
    // default event objects
    var hour1 = {
        hr: moment().set("hour", startTime).format('h a'),
        event: ""
    }
    var hour2 = {
        hr: moment().set("hour", startTime + 1).format('h a'),
        event: ""
    }
    var hour3 = {
        hr: moment().set("hour", startTime + 2).format('h a'),
        event: ""
    }
    var hour4 = {
        hr: moment().set("hour", startTime + 3).format('h a'),
        event: ""
    }
    var hour5 = {
        hr: moment().set("hour", startTime + 4).format('h a'),
        event: ""
    }
    var hour6 = {
        hr: moment().set("hour", startTime + 5).format('h a'),
        event: ""
    }
    var hour7 = {
        hr: moment().set("hour", startTime + 6).format('h a'),
        event: ""
    }
    var hour8 = {
        hr: moment().set("hour", startTime + 7).format('h a'),
        event: ""
    }
    events = [hour1, hour2, hour3, hour4, hour5, hour6, hour7, hour8];
}

// save notepad
$("#notes").on("blur", function () {
    localStorage.setItem("notes", $("#notes").val());
})

// update times for a new day
var updateDay = function () {
    if (moment(events[7].hr).isBefore(moment(), 'day')) {
        startTime = 9;
        for (var i = 0; i < events.length; i++) {
            events[i].hr = moment().set("hour", (i + startTime));
        }
    }
}

// check events
// change colour for past, present, future events
var checkEvents = function () {
    $(".time-block").each(function (index) {
        if (moment(events[index].hr).isSame(moment(), 'hour')) {
            $(this).removeClass("past future");
            $(this).addClass("present");
        }
        else if (moment(events[index].hr).isBefore(moment(), 'hour')) {
            $(this).removeClass("present future");
            $(this).addClass("past");
        }
        else {
            $(this).removeClass("past present");
            $(this).addClass("future");
        }
    });
};

// save events to localStorage
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
}

// update current event
var updateEvent = function(index) {
    events[index].event = ($(".time-block").get(index)).textContent;

    saveEvents();
}

// update all events
var updateAllEvents = function () {
    $(".time-block").each(function (index) {
        events[index].event = $(this).text();
    });

    saveEvents();
};

// load events from local storage 
// update timeblocks with event text
var loadEvents = function () {
    $(".row").each(function (index) {
        $(this)
            .find($(".time-block"))
            .text(events[index].event)

        $(this)
            .find($(".hour-text"))
            .text(moment(events[index].hr).format('h a'))
    });
    checkEvents();

    // load notes
    var savedNote = localStorage.getItem("notes");
    if (!savedNote) {
        $("#notes").val("Take notes here!")
    }
    else {
        $("#notes").val(savedNote);
    }
}

// click listener for time block div element
$(".row").on("click", ".time-block", function () {
    var currEventIndex = $(".time-block").index($(this));
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
            .attr('id', "event-input")
            .val(text);

        // display save button
        $(this).closest(".row")
            .find(".save-btn")
            .removeClass("d-none")
            .addClass(timeClass + " d-flex");

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

    // make save button invisible
    $(this).closest(".row")
        .find(".save-btn")
        .removeClass("present future d-flex")
        .addClass("d-none");

    // recreate div element
    var newEvent = $("<div>")
        .addClass("time-block col border-2 ml-n2px text-left py-3")
        .text(text);

    // replace textarea with div element
    $(this).replaceWith(newEvent);

    // update new event 
    updateEvent($(".time-block").index(newEvent));
    checkEvents();
});

// clear all events
$(".btn-black").on("click", function () {
    if (this.id === "clear") {
        // only clear present/future events
        $(".time-block").each(function (index) {
            if (!(moment(events[index].hr).isBefore(moment(), 'hour'))) {
                $(this).text("");
                updateAllEvents();
            }
        })
    }
    // clear all events
    else if (this.id === "clear-all") {
        $(".time-block").each(function (index) {
            $(this).text("");
            updateAllEvents();
        })
    }
});

updateDay();
loadEvents();
