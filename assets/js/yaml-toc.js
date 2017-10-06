var path = window.location.pathname,
    page = path.split("/").pop(),
    headings = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4, #content h5, #content h6');

function createEntry(heading, previousHeading, nextHeading) {
  var file = page.replace('.html',''),
      id = heading.id,
      label = heading.innerHTML,
      tag = heading.tagName,
      headingLevel = tag.replace('H',''),
      headingLevelNumber = parseInt(headingLevel),
      indent = '  '.repeat(headingLevelNumber * 2),
      entryChildren = '';
      if (previousHeading !== 'none') {
        var previousHeadingLevel = previousHeading.tagName.replace('H',''),
            previousHeadingLevelNumber = parseInt(previousHeadingLevel);
            if (previousHeadingLevelNumber < headingLevelNumber) {
                var isChild = true;
                    // indent = '  '.repeat(previousHeadingLevelNumber) + '    ';
            }
      };
      if (nextHeading !== 'none') {
        var nextHeadingLevel = nextHeading.tagName.replace('H',''),
            nextHeadingLevelNumber = parseInt(nextHeadingLevel);
        if (nextHeadingLevelNumber > headingLevelNumber) {
            var entryChildren = indent + '  children:',
                isParent = true;
        };
        if (nextHeadingLevelNumber === headingLevelNumber) {
            var isOlderSibling = true;
        };
        if (previousHeadingLevelNumber === headingLevelNumber) {
            var isYoungerSibling = true;
        };
      };
    var entry = indent + '- file: "'  + file + '"\n' +
                indent + '  id: "'    + id   + '"\n' +
                indent + '  label: "' + label + '"\n';
    console.log(entry + entryChildren);
}

function makeYAML(alltheheadings) {
    alltheheadings.forEach(function(item, index) {
        var thisEntry = item;
        if (index == 0) {
            var previousEntry = 'none';
        } else {
            var previousEntry = alltheheadings[index-1];
        };
        if (index == alltheheadings.length - 1) {
            var nextEntry = 'none';
        } else {
            var nextEntry = alltheheadings[index+1];
        };
        createEntry(thisEntry, previousEntry, nextEntry);
    });
}

makeYAML(headings);
