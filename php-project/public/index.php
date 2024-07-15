<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React in PHP</title>
  <script type="module" src="/dist/main.js"></script>
</head>

<body>
  <div id="root"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const reactRoot = document.getElementById('root');
      const myComponent = document.createElement('my-react-component');
      myComponent.setAttribute('initialValue', 'Hello from PHP');

      myComponent.setAttribute('filepath', 'Hello from PHP');

      // Serialize your multiline string
      var multilineString = `public class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello, World!");
      
    }
}`;
      var message = JSON.stringify({
        multilineString: multilineString
      });

      // Select the iframe
      var iframe = document.querySelector('iframe');

      // Wait for the iframe to load
      iframe.onload = function() {
        // Send the message
        iframe.contentWindow.postMessage(message, 'http://localhost:8080');
      };

      // Listen for value changes from the React component
      myComponent.addEventListener('valueChange', function(event) {
        //console.log('Value changed to:', event.detail);
        //document.getElementById('react-component-value').innerText = event.detail;
      });

      reactRoot.appendChild(myComponent);
    });
  </script>
  <!-- iframe to invoke http://localhost:8080/packages/examples/react-client/index.html -->
  <iframe src="http://localhost:8080/packages/examples/react-client/index.html" width="600" height="400"></iframe>
</body>

</html>