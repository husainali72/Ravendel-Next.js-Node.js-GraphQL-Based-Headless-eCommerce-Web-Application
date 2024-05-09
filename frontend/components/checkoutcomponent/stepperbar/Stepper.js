/* eslint-disable react/prop-types */

const Stepper = ({ activeStep, steps }) => {

    return (
        <>
            <div className="stepper">
                <ul className="stepper-head" >
                    <li  className={activeStep === 1 ? 'active' : 'normal'}>
                        <span>{steps[0]}</span>
                        <span className="circle"></span>
                    </li>
                    <li className={activeStep === 2 ? 'active' : 'normal'}>
                        <span>{steps[1]}</span>
                        <span className="circle"></span>
                    </li>
                    <li  className={activeStep === 3 ? 'active' : 'normal'}>
                        <span>{steps[2]}</span>
                        <span className="circle"></span>
                    </li>
                </ul>
            </div>

        </>
    )
}
export default Stepper;