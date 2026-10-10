
/**
 * メイン関数
 */
const main = async () => {
  // API Base エンドポイント
  const url = 'https://api.subq.ai/v1/systemone';
  
  // API リクエストのオプション
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUBQ_API_KEY}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'subq-snap-preview',
      state: 'Patient with asthma reports a sore throat, fever since yesterday, and shortness of breath walking to the kitchen this morning.',
      questions: {
        escalate: {
          type: 'noul',
          instructions: 'Should a nurse see this chat before the patient books anything?',
          criteria: {
            true: 'Breathing trouble, chest pain, or a flare of a known condition',
            false: 'Stable symptoms the patient can book for themselves'
          }
        }
      }
    })
  };

  // API リクエストを送信
  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

}

main();