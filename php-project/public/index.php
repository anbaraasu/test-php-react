
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React in PHP</title>
  <script src="/react/static/js/main.ca6f10c4.js"></script>
</head>
<body>
  <div id="react-root"></div>
<p><div id="react-component-value"></div></p>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const reactRoot = document.getElementById('react-root');
      const myComponent = document.createElement('my-react-component');
      myComponent.setAttribute('initial-value', 'Hello from PHP');
      
      // Listen for value changes from the React component
      myComponent.addEventListener('valueChange', function(event) {
        //console.log('Value changed to:', event.detail);
        document.getElementById('react-component-value').innerText = event.detail;
      });

      reactRoot.appendChild(myComponent);
    });
  </script>
</body>
</html>