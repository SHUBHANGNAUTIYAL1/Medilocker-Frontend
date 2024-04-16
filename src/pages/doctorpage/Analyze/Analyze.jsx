import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import usefe from '../../../hook/usefe';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Analyze.css'

function Analyze() {
    const { data1, loading1 } = usefe(`http://localhost:8100/api/auth/`);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [reports, setReports] = useState([]);
    const [bpData, setBpData] = useState([]);
    const [heartRateData, setHeartRateData] = useState([]);
    const [sugarData, setSugarData] = useState([]);
    const [pulseCountData, setPulseCountData] = useState([]);
    const bpCanvasRef = useRef(null);
    const sugarCanvasRef = useRef(null);
    const pulseCanvasRef = useRef(null);
    const heartRateCanvasRef = useRef(null);

    useEffect(() => {
        if (selectedPatient) {
            
            axios.get(`http://localhost:8100/api/report/user/${selectedPatient}`)
                .then(response => {
                    setReports(response.data.Repo);
                })
                .catch(error => {
                    console.error('Error fetching reports:', error);
                });
        }
    }, [selectedPatient]);

    useEffect(() => {
        // Extract data from reports
        const bpArray = [];
        const heartRateArray = [];
        const sugarArray = [];
        const pulseCountArray = [];
        reports.forEach((report, index) => {
            bpArray.push(report.bp);
            heartRateArray.push(report.heart);
            sugarArray.push(report.sugar);
            pulseCountArray.push(report.pulse);
        });
        setBpData(bpArray);
        setHeartRateData(heartRateArray);
        setSugarData(sugarArray);
        setPulseCountData(pulseCountArray);
    }, [reports]);

    useEffect(() => {
        const createChart = (canvasRef, data, label, backgroundColor) => {
            if (canvasRef && canvasRef.current && data.length > 0) {
                const ctx = canvasRef.current.getContext('2d');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Array.from({ length: data.length }, (_, i) => i + 1),
                        datasets: [
                            {
                                label: label,
                                data: data,
                                backgroundColor: backgroundColor,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        };

        createChart(bpCanvasRef, bpData, 'BP', 'rgba(255, 99, 132, 0.6)');
        createChart(sugarCanvasRef, sugarData, 'Sugar', 'rgba(54, 162, 235, 0.6)');
        createChart(pulseCanvasRef, pulseCountData, 'Pulse', 'rgba(75, 192, 192, 0.6)');
        createChart(heartRateCanvasRef, heartRateData, 'Heart Rate', 'rgba(255, 206, 86, 0.6)');
    }, [bpData, sugarData, pulseCountData, heartRateData]);

    return (
        <>
            <Navbar />
            <div className="analyze">
            <div className="input-section">
                    <input list="options" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="pat" style={{marginTop:'20px'}} placeholder="Choose Patient" />
                    <datalist id="options">
                        {loading1 ? "Loading" : (
                            <>
                                {data1.user?.map((item, index) => {
                                    if (item.role === "patient")
                                        return <option key={index + 1} value={item._id}>{item.username}</option>;
                                    else return null;
                                })}
                            </>
                        )}
                    </datalist>
                </div>

                {reports.length > 0 && (
                    <div className="graphs">
                        <div className="graph">
                            <canvas ref={bpCanvasRef}></canvas>
                        </div>
                        <div className="graph">
                            <canvas ref={sugarCanvasRef}></canvas>
                        </div>
                        <div className="graph">
                            <canvas ref={pulseCanvasRef}></canvas>
                        </div>
                        <div className="graph">
                            <canvas ref={heartRateCanvasRef}></canvas>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Analyze;
