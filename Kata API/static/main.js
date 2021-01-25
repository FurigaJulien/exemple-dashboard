Highcharts.chart('temp', {

  title: {
    text: 'Cas de covid en France par jour'
  },

  subtitle: {
    text: 'Source: data.gouv.fr'
  },

  yAxis: {
    title: {
      text: 'Nombre de personnes'
    }
  },

  xAxis: {
    type: 'datetime',
    accessibility: {
      rangeDescription: 'Range: 2018 to now'
    }

  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2018
    }
  },
  

  series: [{
    name: 'Hospitalisation',
    data: value[0],
    pointStart: Date.UTC(2017, 1, 30), 
    pointInterval: 3600 * 1000 * 24
  }, {
    name: 'Réanimation',
    data: value[1],
    pointStart: Date.UTC(2017, 1, 30), 
    pointInterval: 3600 * 1000 *24
  }, {
    name: 'Décès',
    data: value[2],
    pointStart: Date.UTC(2017, 1, 30), 
    pointInterval: 3600 * 1000 *24
  },
  

],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

});

Highcharts.chart('container', {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Temperature'
  },
  xAxis: [{
    categories: value[4]
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value} °C',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    title: {
      text: 'Temperature moyenne',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    }
  }, { // Secondary yAxis
    title: {
      text: 'Temperature min/max',
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    },
    labels: {
      format: '{value} °C',
      style: {
        color: Highcharts.getOptions().colors[0]
      }
    },
    opposite: true
  }],

  tooltip: {
    shared: true
  },

  series: [{
    name: 'Temperature',
    type: 'column',
    yAxis: 1,
    data: value[0],
    tooltip: {
      pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} °C</b> '
    }
  }, {
    name: 'Temperature error',
    type: 'errorbar',
    yAxis: 1,
    data: value[3],
    tooltip: {
      pointFormat: '(error range: {point.low}-{point.high} °C)<br/>'
    }
  }]
});
