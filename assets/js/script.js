// global variables
var today = dayjs().format('dddd, MMMM D YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

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
        .addClass("text-light text-left")
        .text(text);

    // replace textarea with p element
    $(this).replaceWith(taskP);
});