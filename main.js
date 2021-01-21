/*
Solution of the "Mystery Organism" Codecademy Portfolio Project  
Jaime Fúster de la Fuente
21/01/2021
*/
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for P.Aequor objects
const pAequorFactory = (number, bases) => {
  let pAequor = {
    _specimenNum: number,
    _dna: bases,
    mutate(){
      let randIndex = Math.floor(Math.random()*15);
      let randomBase = this._dna[randIndex];
      console.log('randomBase: ' + randomBase);
      let base;
      do {
        base = returnRandBase();
      }while (base === randomBase);

      console.log('HELLO ' + base + ' index: ' + randIndex);
      this._dna.splice(randIndex, 1, base)
    },
    compareDNA(pAequor){
      let myDna = this._dna;
      let otherDna = pAequor._dna;
      let percent = 0;

      for (let i = 0; i < myDna.length; i++){
        if (myDna[i] === otherDna[i]) percent += 1;
      }
      percent = Math.round((percent*100/15)*100)/100;

      console.log(`specimen #${this._specimenNum} and specimen 
      #${pAequor._specimenNum} have ${percent}% DNA in common`);
      return percent;
    },
    willLikelySurvive(){
      let percent = 0;
      this._dna.forEach(element => {
        if(element === 'G' || element === 'C')
          percent ++;
      });
      percent = Math.round((percent*100/15)*100)/100;
      //console.log(percent);
      return percent >= 60;
    },
    complementStrand(){
      let complementaryStrand = [];
      for (let base of this._dna){
        switch (base) {
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'C':
            complementaryStrand.push('G');
            break;
          case 'G':
            complementaryStrand.push('C');
            break;
        }
      }
      return complementaryStrand;
    },
  };
  return pAequor;
}

const createsHealthyArray = (n) => {
  let healthyArray = [];

  for (let i = 0; i < n; i++){
    let pAequor = pAequorFactory(i, mockUpStrand());
    
    while (!pAequor.willLikelySurvive()){
      pAequor = pAequorFactory(i, mockUpStrand()); 
    }
    
    healthyArray.push(pAequor);
  }
  return healthyArray;
}

const findMostRelated = (array) => {
  let mostRelated = [];
  let percent = 0;
  
  for (let i = 0; i < array.length; i ++){
    let current = array[i];
    
    for (let j = 0; j < array.length; j ++){
      if (i != j){
        let other = array[j];
        let currentPercent = current.compareDNA(other);
        
        if(currentPercent > percent) {
          percent = currentPercent;
          mostRelated = [current, other];
        }
      }
    }
  }

  return {
    pair: mostRelated,
    similarity: percent,
  };
}

/* const mockUp1 = pAequorFactory(1, mockUpStrand());
const mockUp2 = pAequorFactory(2, mockUpStrand());
console.log(mockUp1);
mockUp1.mutate();
console.log(mockUp1);

console.log('Mock up 1 DNA: '+mockUp1._dna);
console.log('Mock up 2 DNA: '+mockUp2._dna);
mockUp1.compareDNA(mockUp2);
console.log('M1 will likely survive: ' + mockUp1.willLikelySurvive());
console.log('M2 will likely survive: ' + mockUp2.willLikelySurvive());
 */
const thirtyHealthy = createsHealthyArray(30);
console.log(thirtyHealthy.map(e => e.willLikelySurvive()));

console.log('O: ' + thirtyHealthy[0]._dna + '\nC: ' 
              + thirtyHealthy[0].complementStrand());
const mostRel = findMostRelated(thirtyHealthy);
console.log('Most related: \nPair: ['
  + mostRel.pair[0]._specimenNum + ', ' 
  + mostRel.pair[1]._specimenNum + ']' + '\nPercent: ' + mostRel.similarity)



