(function() {
  var map = new Datamap({
    element: document.getElementById("map"),
    projection: 'mercator',
    fills: {
      defaultFill: "#CCCCCC"
    }
  });

  var colors = d3.scale.category20();
  var languagesWithColor = Object.keys(languages).reduce(function(memo, language, index) {
    memo[language] = languages[language];
    memo[language].color = colors(index);
    return memo;
  }, {});

  function getCountries(selectedLanguages) {
    map.updateChoropleth({}, { reset: true });

    selectedLanguages.each(function() {
      fetchCountryInfo(this.value);
    });
  }

  function fetchCountryInfo(language) {
    $.get('https://restcountries.eu/rest/v2/lang/' + language, function(response) {
      $.each(response, function(index, country) {
          var opts = {};
          opts[country.alpha3Code] = languagesWithColor[language].color;
          map.updateChoropleth(opts);
      });
    });
  }

  window.getCountries = getCountries;
  window.languagesWithColor = languagesWithColor;
})();
