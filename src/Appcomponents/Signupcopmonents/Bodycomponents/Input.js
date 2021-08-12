import { useRef, forwardRef, useImperativeHandle } from 'react'

const Input = forwardRef(({type, name, class_name, placeholder}, ref) => {
    const input_ref = useRef(null)
    useImperativeHandle(
        ref,
        () => (input_ref.current),
        []
    )
    return (
        <>
          <input className={class_name} type={type} name={name} placeholder={placeholder} ref={input_ref} />  
        </>
    )
})

export default Input
