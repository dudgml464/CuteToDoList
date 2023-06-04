import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const IconButton = ({icon, color, size, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialIcons name={icon} size={size} color={color} />
        </TouchableOpacity>
    );
};

export default IconButton;
