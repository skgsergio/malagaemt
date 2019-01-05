# Malaga EMT realtime viewer using CARTO VL and Mapbox GL

This is a very simple proof of concept using Malaga's  EMT Open Data.

At first, I wanted to be full frontend magic but, due to CORS restrictions, I
can't load the data directly from the source so I created a silly proxy for
that using Node. Additionally, the node server caches the response for 1 minute
that is the update frequency of the dataset.

The styling and interactivity for every bus are handled using CARTO VL. The
labels for bus numbers are rendered using plain MapboxGL.
