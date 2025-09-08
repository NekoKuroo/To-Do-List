mengingatkan untuk download 

npm init -y              # buat package.json
npm install express      # web framework utama
npm install cors         # supaya frontend bisa akses API (Cross-Origin Resource Sharing)
npm install body-parser  # untuk baca data JSON dari request
npm install --save-dev nodemon

dan jangan lupa untuk update package.json 
=>  
  "start": "node server.js",
  "dev": "nodemon server.js" 
<=
