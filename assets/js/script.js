// global variables
var today = dayjs().format('dddd, MMMM D YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

console.log(dayjs().format('H a'));

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
    $(".event-text").each(function(index) {
        console.log(index + ": " + $(this).text());
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

    $(".event-text").each(function (index) {
        $(this).text(events[index].event);
        console.log(index + ": " + $(this).text());
    });
}

// click listener for p element in time block
$(".time-block").on("click", "p", function () {
    // get text from <p> element
    var text = $(this)
        .text()
        .trim();

    // change to form input
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
    $(this).replaceWith(textInput);
    // automatically select text
    textInput.trigger("select");
});

// replace event text with new input
$(".time-block").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    /*
    // get the parent ul's id attribute
    var status = $(this)
        .closest(".list-group")
        .attr("id")
        .replace("list-", "");

    // get the task's position in the list of other li elements
    var index = $(this)
        .closest(".list-group-item")
        .index();

    tasks[status][index].text = text;
    saveTasks();
    */

    // recreate p element
    var taskP = $("<p>")
        .addClass("event-text text-light text-left")
        .text(text);

    // replace textarea with p element
    $(this).replaceWith(taskP);

    saveEvents();
});

loadEvents();
