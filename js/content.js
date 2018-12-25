(function($) {
  var debug = false;

  if (debug) {
    console.log('Splice Sounds Shortcuts Extension Loaded');
  }

  var clickEvent = new Event('click');

  $(window).on('keydown', function(e) {

    if ($('input:focus').length > 0) {
      if (debug) {
        console.log("Skipping Splice Sounds Shortcuts (Text input is in focus)");
      }
      return;
    }

    // We don't handle any of these types of key commands so let's
    // return to avoid getting in the way of other people's shortcuts.
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // The currently active/playing sample will have
    // the .playing class which makes it easy to find.
    var $findInActiveRow = function(query) {
      return $('.sounds-list-item.playing ' + query);
    };

    var downloadAllSelectedSamples = function() {
      $('[data-qa="download-multiple"]')[0].dispatchEvent(clickEvent);
      if (debug) { console.log('downloadAllSelectedSamples clicked') }
    };

    var stopPlay = function() {
      $findInActiveRow('.fa-stop')[0].dispatchEvent(clickEvent);
    };

    // Handle `shift + alt + KEY` key shortcuts
    // separately from `shift + KEY` shortcuts.
    if (e.shiftKey && e.altKey) {
      switch(e.keyCode) {
        case 68: // shift + alt + D
          // Download all selected
          selectedCount = $('.sample-row.s-row-selected').length
          if (selectedCount > 1) {
            if (confirm("Are you sure you want to download all " + selectedCount + " samples?")) {
              downloadAllSelectedSamples();
            }
          } else {
            downloadAllSelectedSamples();
          }
          break;
        case 65: // shift + alt + A
          // Deselect all
          $('[data-qa="deselect-all"]')[0].dispatchEvent(clickEvent);
          break;
      }
    }
    else if (e.shiftKey) {
      switch(e.keyCode) {
        case 80: // shift + P
          if (debug) { console.log("Play event: shift + P"); }
          // Play
          stopPlay(); // stop in case a clip is still playing
          setTimeout(function() {
            $findInActiveRow('.fa-play-circle')[0].dispatchEvent(clickEvent);
          }, 20);
          break;
        case 83: // shift + S
          if (debug) { console.log("Stop event: shift + S"); }
          // Stop play
          stopPlay();
          break;
        case 76: // shift + L
          if (debug) { console.log("Like event: shift + L"); }
          // Love sample
          $findInActiveRow('.add-icon')[0].dispatchEvent(clickEvent);
          if (debug) { console.log('clicked like', $findInActiveRow('.add-icon')[0]) }
          break;
        case 68: // shift + D
          if (debug) { console.log("Download event: shift + D"); }
          // Download sample
          $findInActiveRow('.download-icon')[0].dispatchEvent(clickEvent);
          if (debug) { console.log('clicked download', $findInActiveRow('.download-icon')[0]) }
          break;
        case 65: // shift + A
          if (debug) { console.log("Select sample: shift + A"); }
          // Select sample
          $findInActiveRow('input[type="checkbox"]')[0].dispatchEvent(clickEvent);
          break;
      }
    }


  });

})(jQuery)
