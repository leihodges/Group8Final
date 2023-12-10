// document.getElementById('next').addEventListener('click', function() {
//   // Set the new URL for the next page
//   window.location.href = 'https://leihodges.github.io/Group8Final/page2/index.html';
// });

$("#home").click(function() {
  $("#recipeDiv").hide();
});

$("#next").click(function() {
  $("#recipeDiv").show();
});

// $("#home").click(function() {
//   $("#recipeDiv").hide();
// });

// // When a tab is clicked
// $('.tab').click(function() {
//   // Get the value of the data-tab attribute of the clicked tab
//   var tabId = $(this).data('tab');
  
//   // Remove the 'active' class from all tabs
//   $('.tab').removeClass('active');
//   // Add the 'active' class to the clicked tab
//   $(this).addClass('active');
  
//   // Hide all tab panes
//   $('.tab-pane').removeClass('active');
//   // Show the tab pane corresponding to the clicked tab
//   $('[data-tab-content="' + tabId + '"]').addClass('active');
// });