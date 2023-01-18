
const Stepper = ({ activeStep, steps }) => {

    return (
        <>
            <div className="stepper">
                <ul className="stepper-head" >
                    <li >
                        <span className={activeStep === 1 ? 'active' : 'normal'}>{steps[0]}</span>
                    </li>
                    <li>
                        <span className={activeStep === 2 ? 'active' : 'normal'}>{steps[1]}</span>
                    </li>
                    <li >
                        <span className={activeStep === 3 ? 'active' : 'normal'}>{steps[2]}</span>
                    </li>
                </ul>
            </div>

        </>
    )
}
export default Stepper;