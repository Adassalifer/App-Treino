import { useState, useEffect } from "react";
import Footer from './components/Footer';



function ExercisePlanner() {
  const [exercisePlan, setExercisePlan] = useState({
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sábado: []
  
  });

  useEffect(() => {
    localStorage.setItem('exercisePlan', JSON.stringify(exercisePlan));
  }, [exercisePlan]);

  useEffect(() => {
  const localData = localStorage.getItem('exercisePlan');
  if (localData) {
    setExercisePlan(JSON.parse(localData));
  }
}, []);

  const handleExercisePlan = (event) => {
    const { name, value } = event.target;
    const dayOfWeek = name.split("-")[0];
    const exerciseIndex = parseInt(name.split("-")[1])-1;

    let newExercisePlan = {...exercisePlan};
    newExercisePlan[dayOfWeek][exerciseIndex] = value;

    setExercisePlan(newExercisePlan);
  }

  const clearForm = () => {
    const form = document.getElementById("exercise-plan-form");
    form.reset();
  }

  const displayExercisePlan = () => {
    let plan = [];

    for (const [key, value] of Object.entries(exercisePlan)) {
      let day = key.charAt(0).toUpperCase() + key.slice(1);
      let exercises = value;
      plan.push(<div key={key}>
                  <h3>{day}</h3>
                  <ul>
                    {exercises.map((exercise, index) => (
                      <li key={`${key}-${index}`}>{exercise}</li>
                    ))}
                  </ul>
                </div>
          )
    }

    return plan;
  }

  const addExerciseField = (event) => {
    event.preventDefault();
    let newExercisePlan = {...exercisePlan};
    newExercisePlan[event.target.name].push("");
    setExercisePlan(newExercisePlan);
  }

  const validateForm = () => {
    let errors = false;

    for (const [key, value] of Object.entries(exercisePlan)) {
      let dayErrors = value.filter(exercise => exercise.trim() === "").length;
      if (dayErrors > 0) {
        errors = true;
      }
    }

    return !errors;
  }

  const headerColor = () => {
    let totalExercises = Object.values(exercisePlan).flat().filter(exercise => exercise.trim() !== "").length;

    if (totalExercises < 7) {
      return { color: "black" };
    } else if (totalExercises >= 7 && totalExercises < 14) {
      return { color: "orange" };
    } else {
      return { color: "green" };
    }
  }

  return (
    <div>
      <form id="exercise-plan-form">
        <h2>Meu plano de treino</h2>
        <div>
          <label htmlFor="segunda-1">Segunda-feira - Exercícios:</label>
          <input type="text" name="segunda-1" onChange={handleExercisePlan} />
        </div>
        
        <div>
          <label htmlFor="terca-1">Terça-feira - Exercícios:</label>
          <input type="text" name="terca-1" onChange={handleExercisePlan} />
        </div>
        
        <div>
          <label htmlFor="quarta-1">Quarta-feira - Exercícios:</label>
          <input type="text" name="quarta-1" onChange={handleExercisePlan} />
        </div>
        
        <div>
          <label htmlFor="quinta-1">Quinta-feira - Exercícios:</label>
          <input type="text" name="quinta-1" onChange={handleExercisePlan} />
        </div>
        
        <div>
          <label htmlFor="sexta-1">Sexta-feira - Exercícios:</label>
          <input type="text" name="sexta-1" onChange={handleExercisePlan} />
        </div>
       
        <div>
          <label htmlFor="sábado-1">Sábado - Exercícios:</label>
          <input type="text" name="sábado-1" onChange={handleExercisePlan} />
        </div>
        
        {/* Repita para os outros dias da semana */}
        <div>
          <button onClick={clearForm}>Clear</button>
        </div>
      </form>
      <div style={headerColor()}>
        <h2>Meu Plano de Exercícios Semanal</h2>
        {displayExercisePlan()}
      </div>
    </div>
  );
}

export default ExercisePlanner;
