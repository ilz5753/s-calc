export function initialState(): any {
    return {
        current: "0",
        previous: null,
        operator: null,
    };
}
export function Number(value: any, state: any): any {
    if (state.current === "0") {
        return { current: `${value}` };
    }
    if(state.current.includes('.')){
        return{
            current: `${state.current}`
        }
    }
    return {
        current: `${state.current}${value}`
    };
}
export function Equal(state: any): any {
    let { current, operator, previous } = state;
    let curr = parseFloat(current);
    let prev = parseFloat(previous);
    let reserState = {
        operator: null,
        previous: null,
    };
    if (operator === " / ") {
        return {
            current: prev / curr,
            ...reserState
        };
    }
    if (operator === " * ") {
        return {
            current: prev * curr,
            ...reserState
        };
    }
    if (operator === " - ") {
        return {
            current: prev - curr,
            ...reserState
        };
    }
    if (operator === " * ") {
        return {
            current: prev * curr,
            ...reserState
        };
    }
    return state;
}
export default function Calculator(type: string, value: any, state: any): any {
    switch (type) {
        case 'number':
            return Number(value, state);
        case 'operator':
            return {
                operator: value, previous: state.current, current: "0"
            };
        case "=":
            return Equal(state);
        case "+/-":
            return {
                current: `${parseFloat(state.current) * (-1)}`
            };
        case "%":
            return {
                current: `${parseFloat(state.current) * (0.01)}`
            };
        default:
            return state;
    }
}