;(function ($) {
   var debug = true

   console.log('Splice Sounds Shortcuts Extension Loaded')

   $(window).on('keydown', function (e) {
      if ($('input:focus').length > 0) {
         if (debug) {
            console.log(
               'Skipping Splice Sounds Shortcuts (Text input is in focus)'
            )
         }
         return
      }

      // We don't handle any of these types of key commands so let's
      // return to avoid getting in the way of other people's shortcuts.
      if (e.ctrlKey || e.metaKey) {
         return
      }

      // The currently active/playing sample will have
      // the .playing class which makes it easy to find.
      var findInActiveRow = function (query) {
         return $('.sounds-list-item.playing ' + query)
      }

      var downloadAllSelectedSamples = function () {
         let downloadMultiple = $('[data-qa="download-multiple"]')
         downloadMultiple.trigger('click')
         if (debug) {
            console.log(
               'downloadAllSelectedSamples clicked',
               downloadMultiple[0]
            )
         }
      }

      var stopPlay = function () {
         let stopEl = findInActiveRow('[icon="stop-solid"]')
         stopEl.trigger('click')
         if (debug) {
            console.log('clicked stop', stopEl[0])
         }
      }

      // Handle `shift + alt + KEY` key shortcuts
      // separately from `shift + KEY` shortcuts.
      if (e.shiftKey && e.altKey) {
         switch (e.keyCode) {
            case 68: // shift + alt + D
               // Download all selected
               let selectedCount = $('.sample-row.s-row-selected').length
               if (selectedCount > 1) {
                  if (
                     confirm(
                        'Are you sure you want to download all ' +
                           selectedCount +
                           ' samples?'
                     )
                  ) {
                     downloadAllSelectedSamples()
                  }
               } else {
                  downloadAllSelectedSamples()
               }
               break
            case 65: // shift + alt + A
               // Deselect all
               let deselectAllEl = $('[data-qa="deselect-all"]')
               deselectAllEl.trigger('click')
               if (debug) {
                  console.log('clicked deselect all', deselectAllEl[0])
               }
               break
         }
      } else if (e.shiftKey) {
         console.log('Event Key:', e.key, e)
         var clickEvent = new Event('click')

         switch (e.keyCode) {
            case 80: // shift + P
               if (debug) {
                  console.log('Play event: shift + P')
               }
               // Play
               stopPlay() // stop in case a clip is still playing
               setTimeout(function () {
                  let $playEl = findInActiveRow('[icon="play-circle"]')
                  $playEl.trigger('click')
                  if (debug) {
                     console.log('clicked play', $playEl[0])
                  }
               }, 20)
               break
            case 83: // shift + S
               if (debug) {
                  console.log('Stop event: shift + S')
               }
               // Stop play
               stopPlay()
               break
            case 76: // shift + L
               if (debug) {
                  console.log('Like event: shift + L')
               }
               // Love sample
               let $likeEl = findInActiveRow('.sounds-sample-like')[0]
               if ($likeEl) $likeEl.dispatchEvent(clickEvent)
               if (debug) {
                  console.log('Clicked like', $likeEl)
               }
               break
            case 68: // shift + D
               if (debug) {
                  console.log('Download event: shift + D')
               }
               // Download sample
               let $downloadEl = findInActiveRow('[data-qa="download-icon"]')
               $downloadEl.trigger('click')
               if (debug) {
                  console.log('clicked download', $downloadEl[0])
               }
               break
            case 65: // shift + A
               if (debug) {
                  console.log('Select sample: shift + A')
               }
               // Select sample
               let $selectRowEl = findInActiveRow('input[type="checkbox')[0]
               if ($selectRowEl) $selectRowEl.dispatchEvent(clickEvent)
               if (debug) {
                  console.log('Clicked select row checkbox', $selectRowEl)
               }
               break
         }
      }
   })
})(jQuery)
