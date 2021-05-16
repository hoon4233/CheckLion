import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// App.get('/api/rest-auth/logout', auth, (req, res) => {
//   User.findOneAndUpdate({_id: req.user._id},
//       {token:""},    //토큰 삭제
//       (err, user) => {    //콜백 함수
//       if(err) return res.json({ success: false, err});
//       return res.status(200).send({
//           success: true
//       })
//       })
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
