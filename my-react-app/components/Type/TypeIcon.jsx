import classnames from "classnames"
import "./TypeIcon.css"

export default function TypeIcon({type, details}){
    const typeClass = type && `logo-${type}`
    const logoClass = 'logo-class'
    const detailsClass = details ? 'details-class' : ""
    const allClasses = classnames(typeClass, logoClass, detailsClass)
    return (
        <div className={allClasses}>
            {type.toUpperCase()}
        </div>
    )
}