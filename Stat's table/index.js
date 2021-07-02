$("#gameName").hover(function () {
  $("#hoverText").html(
    "Pick the name of your game, it will be displayed as the main row of your table!"
  );
});
$("#players").hover(function () {
  $("#hoverText").html(
    "Pick the number of players in your game! New players can be added later."
  );
});
$("#system").hover(function () {
  $("#hoverText").html(
    "Pick the system that you want your table to be in, Kill/Death/Assist or Win/Loose/Draw"
  );
});

var kdaCounter = 1;
//Table id to know which one to delete
var tableCounter = 1;
function createTable(name, numPlayers, sys) {
  let tablesContent = $("#tables").html();
  let sysTmp = "";
  let playerRows = "";
  //KDA or WLD
  if (sys == "kda") {
    sysTmp = `<tr><th scope="col">Name</th><th scope="col">Kill</th scope="col"><th scope="col">Death</th><th scope="col">Assist</th><th scope="col">KDA</th></tr>`;
    //Add player rows
    for (i = 0; i < numPlayers; i++) {
      playerRows += `<tr class="player"><td>#${
        i + 1
      }<input type="text"></td><td><input type="number" name="kill" class="kill"></td><td><input type="number" name="death" class="death" value=""></td><td><input type="number" name="assist" class="assist" value=""></td><td><input type="text" name="kda${kdaCounter}" class="kda" value="" disabled>0</td></tr>`;
      kdaCounter++;
    }
  } else {
    sysTmp = `<tr><th scope="col">Name</th><th scope="col">Win</th><th scope="col">Lose</th><th scope="col">Draw</th><th scope="col">W/L %</th></tr>`;
    //Add player rows
    for (i = 0; i < numPlayers; i++) {
      playerRows += `<tr class="player"><td>#${
        i + 1
      }<input type="text"></td><td><input type="number" name="win" class="win"></td><td><input type="number" name="lose" class="lose" value=""></td><td><input type="number" name="draw" class="draw" value=""></td><td><input type="number" name="wld${kdaCounter}" value="" class="wld"  disabled>0</td></tr>`;
      kdaCounter++;
    }
  }
  //Create table
  $("#tables").html(
    tablesContent +
      `<table class="table table-bordered table-secondary " id="${tableCounter}" data-reorderable-rows="true"></table>`
  );
  //Creating table content
  $(`#${tableCounter}`).html(
    `<thead><tr><th colspan="5" class="lead fw-bold"><button class="titleButton">${name}</button></th></tr>${sysTmp}</thead><tbody>${playerRows}</tbody>`
  );
  //Make table draggable
  $(`#${tableCounter}`).tableDnD();
  tableCounter++;
  $(".titleButton").dblclick(function () {
    if (!$(this).parent().closest(".table").hasClass("activeTitle")) {
      $(this).parent().closest(".table").addClass("activeTitle");
    } else {
      $(this).parent().closest(".table").removeClass("activeTitle");
    }
  });
  //On keypress update kda or wld ratio
  $('.player :input[type="number"]').keypress(function () {
    console.log("potato");
  });
}

//Create table button
$("#createTable").click(function () {
  if ($("#gameName").val() != "" && $("#players").val() != "") {
    $("#tables").html(
      createTable($("#gameName").val(), $("#players").val(), $("#system").val())
    );
    $("input").val("");
  } else {
    alert("Please fill in BOTH input fields!");
  }
});

//Remove table button
$("#removeTable").click(function () {
  $("*").each(function () {
    if ($(this).hasClass("activeTitle")) {
      this.remove();
    }
  });
});
