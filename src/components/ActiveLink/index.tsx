import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

type ActiveLinkProps = {
    children: ReactElement; // ReactNode if we wanted to accept multiple components
    activeClassName: string; 
} & LinkProps

export function ActiveLink({children, activeClassName, ...props}: ActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === props.href ? activeClassName : ''

    return (
        <Link {...props}>
            
            { 
            // we need to add the classname to the child component. As it is not directly a JSX component it is not possible to directly pass down new 
            // properties. The cloneElement feature allows new props to be provided when an element is being cloned.
            cloneElement(children, {
                className
            })
            }
        </Link>
    );
}