import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";
import { H2 } from 'native-base';
import { HelperText, TextInput } from 'react-native-paper';

function SimpleDialog(props) {
  const { onClose, selectedValue, qrCodeData, onSave, onChange } = props;
  const [rn, setRn] = React.useState("")
  const [fp, setFp] = React.useState("")
  const [sum, setSum] = React.useState("")
  const [time, setTime] = React.useState("")
  const [error, setError] = React.useState(false)

  const validation = (value) => { // TODO: errors = []; errors.push(errorMessage)
    return {
      fp: _.isEmpty(value),
      rn: _.isEmpty(value),
      sum: _.parseInt(value) < 0,
      time: _.isEmpty(value)
    }
  }

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
  };

  const hasErrors = (key, text) => {
    const hasError = validation(text)[key];

    setError(hasError)

    return hasError;
  };

  return (
    <View>
      <Dialog
        visible={props.open}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => handleClose()} />
            <DialogButton text="OK" onPress={() => handleSave()} />
          </DialogFooter>
        }
      >
        <DialogContent>
          <H2
            style={{
              flexDirection: "row",
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            Введите данные с чека
          </H2>
          <View>
            <TextInput onBlur={e => error ? null : onChange({ fp })} label="Фискальный признак" value={fp} onChangeText={setFp} />
            <HelperText type="error" visible={hasErrors('fp', fp)}>
              Фискальный признак пуст
            </HelperText>
          </View>
          <View>
            <TextInput onBlur={e => error ? null : onChange({ rn })} label="Регистрационный номер" value={rn} onChangeText={setRn} />
            <HelperText type="error" visible={hasErrors('rn', rn)}>
              Регистрационный номер пуст
            </HelperText>
          </View>
          <View>
            <TextInput onBlur={e => error ? null : onChange({ sum })} label="Сумма" value={sum} onChangeText={setSum} />
            <HelperText type="error" visible={hasErrors('sum', sum)}>
              Сумма не может быть меньше нуля!
            </HelperText>
          </View>
          <View>
            <TextInput onBlur={e => error ? null : onChange({ time })} label="Дата (с точностью до секунды)" value={time} onChangeText={setTime} />
            <HelperText type="error" visible={hasErrors('time', time)}>
              Дата пуста
            </HelperText>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 4,
    justifyContent: "flex-start",
    alignItems: "flex-start",

    fontSize: 11,
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 11,
  },
  innerText: {
    fontSize: 11,
    fontWeight: "normal",
  },
});
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function QrCodeGenerator(props) {
  return (
    <SimpleDialog
      qrCodeData={props.qrCodeData}
      open={props.opened}
      onClose={props.onClose}
      onSave={props.onSave}
      onChange={props.onChange}
    />
  );
}
