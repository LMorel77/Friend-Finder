$(document).ready(function () {

    // Chosen CSS
    var config =
        {
            ".chosen-select": {},
            ".chosen-select-deselect": { allow_single_deselect: true },
            ".chosen-select-no-single": { disable_search_threshold: 10 },
            ".chosen-select-no-results": { no_results_text: "Oops, nothing found!" },
            ".chosen-select-width": { width: "95%" }
        };

    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

    $(function () {
        $(".chosen-select").chosen();
    });


    var questions = [
        "Your mind is always buzzing with unexplored ideas and plans.",
        "Generally speaking, you rely more on your experience than your imagination.",
        "You find it easy to stay relaxed and focused even when there is some pressure.",
        "You rarely do something just out of sheer curiosity.",
        "People can rarely upset you.",
        "It is often difficult for you to relate to other people’s feelings.",
        "In a discussion, truth should be more important than people’s sensitivities.",
        "You rarely get carried away by fantasies and ideas.",
        "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
        "You feel more energetic after spending time with a group of people."
    ];

    function renderQuestions() {

        for (let i = 0; i < questions.length; i++) {

            var div = $("<div>");
            var select = $("<select>");
            var p = $("<p>");

            // Creating <select> lists
            var optionValues = [
                { val: '', text: 'Choose...' },
                { val: '1', text: '1 (Strongly Disagree)' },
                { val: '2', text: '2' },
                { val: '3', text: '3' },
                { val: '4', text: '4' },
                { val: '5', text: '5 (Strongly Agree)' }
            ];
            p.addClass("surveyResponses");
            select.addClass("chosen-select").attr("id", "q" + (i + 1));
            $(optionValues).each(function () {
                select.append($("<option>").attr('value', this.val).text(this.text));
            });
            p.append(select);

            // Adding questions to <div>
            div.append((i + 1) + ") ");
            div.append(questions[i]);
            div.append(p);
            div.addClass("surveyQuestions");

            // Rendering survey questions to html
            $("#surveyQuestions").append(div);

        }

    };

    renderQuestions();

    // Form validation
    function validateForm() {

        var isValid = true;

        $(".form-control").each(function () {

            if ($(this).val() === "") {
                isValid = false;
            }

        });

        $(".chosen-select").each(function () {

            if ($(this).val() === "") {
                isValid = false;
            }

        });

        return isValid;

    };

    // Capture the survey form inputs
    $("#submit").on("click", function (event) {

        event.preventDefault();

        // If all required fields are filled store user data in object
        if (validateForm()) {

            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]

            };

            // AJAX post to friends API.
            $.post("/api/friends", userData, function (data) {

                console.log("\ndata:\n", data);

                // Rendering repsonse data
                for (let i = 0; i < data.length; i++) {
                    $("#match-name").append(data[i].name);
                    $("#match-img").attr("src", data[i].photo);
                }

                // Show the modal with the best match
                $("#results-modal").modal("toggle");

            });

        }
        else {

            alert("All fields are required! Please complete before submitting!");

        }

    });


});