import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";
import { Item, Input, Icon, H2 } from 'native-base';

function SimpleDialog(props) {
  const { onClose, selectedValue, qrCodeData, onSave, onChange } = props;
  const [rn, setRn] = React.useState("")
  const [fp, setFp] = React.useState("")
  const [sum, setSum] = React.useState("")
  const [time, setTime] = React.useState("")

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
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
          <Item success>
            <Input onBlur={e => onChange({ fp })} onChangeText={setFp} value={fp} placeholder='Фискальный признак' />
          </Item>
          <Item success>
            <Input onBlur={e => onChange({ rn })} onChangeText={setRn} value={rn} placeholder='Регистрационный номер' />
          </Item>
          <Item success>
            <Input onBlur={e => onChange({ sum })} onChangeText={setSum} value={sum} placeholder='Сумма' />
          </Item>
          <Item success>
            <Input onBlur={e => onChange({ time })} onChangeText={setTime} value={time} placeholder='Дата (с точностью до секунды)' />
          </Item>
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
