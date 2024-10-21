import React from 'react';
import '../styles/main.css'; 

const InputField = ({ label, type, id, value, onChange, errorMessage, reverseOrder, className, noWrapper }) => {
    return (
        <div className={`${noWrapper ? '' : 'input-wrapper'} ${className || ''}`}> {/* Ajoute conditionnellement la classe input-wrapper */}

            {reverseOrder ? (
                <>
                    <input
                        type={type}
                        id={id}
                        checked={type === 'checkbox' ? value : undefined} // Gérer les checkboxs
                        value={type !== 'checkbox' ? value : undefined}
                        onChange={onChange}
                    />
                    <label htmlFor={id}>{label}</label>
                </>
            ) : (
                <>
                    <label htmlFor={id}>{label}</label>
                    <input
                        type={type}
                        id={id}
                        checked={type === 'checkbox' ? value : undefined} // Gérer les checkboxs
                        value={type !== 'checkbox' ? value : undefined}
                        onChange={onChange}
                    />
                </>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default InputField;