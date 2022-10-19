import React, {useState} from 'react';
import data from './assets/data.json';
import './App.css';



function App() {
  
  const [allData, setAllData] = useState(data)
  const [filters, setFilters] = useState([]);

  
  let Alltype =[]

  allData.actualites.forEach((item) => {
    Alltype.push(item.type)
  })
  
  let Alltype2 = Alltype.join()

  let Alltype3 = Alltype2.split(',').filter((item, index, self) => {
    return index === self.indexOf(item);
  })

 let inputs = Alltype3.map((item, index) => {
    return (
      <div key={index}>
        <input type="checkbox" id={item} name={item} value={item} onClick={(e)=> handleClick(e.target.value)}/>
        <label htmlFor={item}>{item}</label>
      </div>
    )
  })
  
  
  let handleClick = (e) => {

    let tab = JSON.parse(JSON.stringify(filters))
    if(tab.indexOf(e) > -1){
      tab.splice(tab.indexOf(e), 1);
    } else {
      tab.push(e)
    }

    setFilters(tab);
    
  
  }

 
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title' onClick={() => console.log(allData)}>Actualités</h1>

        <div className='filter'>
          <p className='filter__text'>Trier par type : </p>

          {inputs}

        </div>
      </header>
      <main className="App-main">
      
      {allData.actualites.filter(item => filters.length === 0 || filters.every(filter => item.type.includes(filter))).map((news, index) => {
        return (
          <div className="article" key={index}>
            <h2 className='article__titre'>{news.titre}</h2>
            <p className='article__text'>{news.texte}</p>
          </div>
        )})}
      </main>
    </div>
  );
}



export default App;