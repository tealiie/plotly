// 1-1 : Initial Function that runs on page visit
// 1-2 : onchange function that runs when Sample ID is selected on dropdown
// 2-1 : Retreiving the medata data from the selected sample ID
// 2-2 : Plotting the graphs from the selected sample ID


function init() {
 buildBarPlot(940),
 buildBubbleChart(940)
}

function optionChanged(sample){
    buildBarPlot(sample),
    buildBubbleChart(sample)
};

function buildBarPlot(sample){
    d3.json("samples.json").then((importedData) => {
        var data = importedData.samples;
        // console.log(data);
        console.log(importedData);
      
        var results = data.filter(x=>x.id==sample)
        // console.log(data.filter(x=>x.id==940))
        // console.log(data.filter(x=>x.id==sample))
        // console.log(results)

        var trace1 = {
          x: results[0].sample_values.slice(0,10).reverse(),
          y: results[0].otu_ids.slice(0,10).reverse().map(x=>x.toString()+" OTU"),
          text: results[0].otu_labels.slice(0,10).reverse(),
          type: "bar",
          orientation: "h",
          yaxis_autorange: false,
        };
       
        var chartData = [trace1];
    
        var layout = {
          margin: {
            l: 150,
            t: 30,
          }
        };
      
        Plotly.newPlot("bar", chartData, layout);
      });
}


function buildBubbleChart(sample){
    d3.json("samples.json").then((importedData) => {
        var data = importedData.samples;
      
        var results = data.filter(x=>x.id==sample)

        var trace2 = {
          x: results[0].otu_ids,
          y: results[0].sample_values,
          text: results[0].otu_labels,
          mode: 'markers',
          marker: {
            color: results[0].otu_ids.map(x=>x.toString()),
            size: results[0].sample_values.map(x=>x.toString())
          }
        };
       
        var dataBubble = [trace2];
    
        var layout2 = {
            showlegend: false,
            height: 500,
            width: 900
          };
      
        Plotly.newPlot("bubble", dataBubble, layout2);
      });
}

d3.json("samples.json").then((importedData) => {
    var sample_ids = importedData.names;

    var dropdownMenu = d3.select("#selDataset");

    sample_ids.forEach((x) => {
        dropdownMenu.append("option").property("value", x).text(x)
    })
});

d3.json("samples.json").then((importedData) => {
  var sample_ids = importedData;

  var dropdownMenu = d3.select("#gauge");

  sample_ids.forEach((x) => {
      dropdownMenu.append("option").property("value", x).text(x)
  })
});


init();


