(function() {
  var map = new Datamap({
    element: document.getElementById("map"),
    geographyConfig: {
        highlightOnHover: false
    },
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

  var population;
  function getCountries(selectedLanguages) {
    population = 0;
    map.updateChoropleth({}, { reset: true });
    updatePopulation(population);

    selectedLanguages.each(function() {
      fetchCountryInfo(this.value);
    });
  }

  function fetchCountryInfo(language) {
    $.get('https://restcountries.eu/rest/v2/lang/' + language, function(response) {
      $.each(response, function(index, country) {
          var opts = {};
          opts[country.alpha3Code] = languagesWithColor[language].color;
          population += country.population;
          map.updateChoropleth(opts);
      });

      updatePopulation(population);
    });
  }

  function updatePopulation(population) {
    $('#population-count').html(numeral(population).format('0.0a').toUpperCase());
  }

  window.getCountries = getCountries;
  window.languagesWithColor = languagesWithColor;
})();
