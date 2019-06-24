// Capitalize first letter of tag name
const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Capitalize;