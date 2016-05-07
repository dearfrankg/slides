
// reveal-directive

app.directive('reveal', function () {


  var convert = function (string) {
    var converter = new Markdown.Converter();
    var result = '';
    var lines = string.split("\n");
    var mdBlock = '';
    for (var i=0, l=lines.length; i < l; i++) {
      var line = lines[i];
      var lineStartsWithHtml = (line.match(/^\s*\</));
      var lastLine = (i == l-1);


      if (lineStartsWithHtml) {

        if (mdBlock) {
          result += converter.makeHtml(mdBlock) + "\n"; 
          mdBlock = '';
        }

        result += line + "\n";  // html
      }
      else {
        mdBlock += line + "\n";

        if (mdBlock && lastLine) {
          result += converter.makeHtml(mdBlock) + "\n"; 
        }
      }
    }
    return result;

  };

  var linker = function (scope, element, attr) { 

    scope.$watch('markdown', function () { 

      if (!scope.markdown) {
        return;
      }

      var slides = scope.markdown.split('@@@');
      var newHtml = '';

      for (var i=0, l=slides.length; i < l; i++) {
        var slideMarkdown = slides[i].trim();
        var slide = convert(slideMarkdown);
        slide = "\n<section>\n" + slide + "\n</section>\n";
        newHtml += slide;   
      }
      element.append(newHtml);

      Reveal.initialize({
          controls: true,
          progress: true,
          history: false,
          center: true,
          theme: 'default',
          transition: 'default',
          dependencies: [
            { src: 'scripts/vendor/reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'scripts/vendor/reveal/plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'scripts/vendor/reveal/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'scripts/vendor/reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'scripts/vendor/reveal/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'scripts/vendor/reveal/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
          ]

      });

    });

  };

  return {
    restrict: 'A',
    link: linker,
    replace: true
  };
});


