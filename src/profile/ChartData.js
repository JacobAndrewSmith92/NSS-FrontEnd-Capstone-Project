import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Title } from 'bloomer';

// averageScore = ([quizeScores]) => {
//         quizeScores.forEach(score => {
//         let totalScore = 0
//         let totalQuizzes = data.length
//         totalScore += score
//         let average = totalScore / totalQuizzes
//         return average
//     })

// }

const data = {
    labels: ['Beer', 'Spirits', 'Policies', 'Breakfast Menu', 'Lunch Menu', 'Dinner Menu', 'Patio Menu'],
    datasets: [
        {
            label: `Scored: 1-100`,
            backgroundColor: 'rgba(77,131,239,0.2)',
            borderColor: 'rgba(77,131,239,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(215,86,104,0.4)',
            hoverBorderColor: 'rgba(215,86,104,1)',
            data: [88, 98, 80, 81, 56, 55, 40, 100, 78]
        }
    ]
};

export default class ChartData extends Component {

    render() {
        return (
            <div>
                <Title hasTextAlign="centered">Quiz Scores</Title>
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: true
                    }}
                />
            </div>
        );
    }
};