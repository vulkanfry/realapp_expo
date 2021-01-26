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
  const { onClose, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <View>
      <Dialog
        visible={props.open}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => handleClose()} />
            <DialogButton text="OK" onPress={() => handleClose()} />
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
            <Input placeholder='Фискальный признак'/>
            <Icon name='checkmark-circle' />
          </Item>
          <Item success>
            <Input placeholder='Регистрационный номер'/>
            <Icon name='checkmark-circle' />
          </Item>
          <Item success>
            <Input placeholder='Сумма'/>
            <Icon name='checkmark-circle' />
          </Item>
          <Item success>
            <Input placeholder='Дата (с точностью до секунды)'/>
            <Icon name='checkmark-circle' />
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
      selectedValue={props.qrCodeData}
      open={props.opened}
      onClose={props.onClose}
      onSave={props.onSave}
    />
  );
}
