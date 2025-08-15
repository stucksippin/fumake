import { useEffect, useState } from "react";
import {
    Box, Button, FormControl, FormControlLabel,
    FormLabel, Radio, RadioGroup, Slider,
    Stack, Typography
} from "@mui/material";
import { useConfigurator } from "../contexts/Configurator";

export const Interface = () => {
    const { tableWidth, setTableWidth, legs, setLegs, legsColor, setLegsColor } = useConfigurator();

    const [opened, setOpened] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setOpened(window.innerWidth > 1024);

        const onResize = () => setOpened(window.innerWidth > 1024);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);



    return (
        <Box
            sx={{ position: "absolute", top: 0, right: 0, bottom: 0, overflow: "auto" }}
            p={3}
        >
            <Stack spacing={3}>
                <Button
                    onClick={() => setOpened((o) => !o)}
                    style={{ justifyContent: "flex-end" }}
                >
                    <Typography variant="caption">{opened ? "Закрыть" : "Открыть"}</Typography>
                </Button>
                {opened && (
                    <>
                        <Box className="glass" p={3}>
                            <FormControl>
                                <FormLabel>Размер стола</FormLabel>
                                <Slider
                                    sx={{ width: 200 }}
                                    min={50}
                                    max={300}
                                    value={tableWidth}
                                    onChange={(e, value) => setTableWidth(value)}
                                    valueLabelDisplay="auto"
                                />
                            </FormControl>
                        </Box>
                        <Box className="glass" p={3}>
                            <FormControl>
                                <FormLabel>Вариации опор</FormLabel>
                                <RadioGroup
                                    value={legs}
                                    onChange={(e) => setLegs(parseInt(e.target.value))}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label="Standard" />
                                    <FormControlLabel value={1} control={<Radio />} label="Solid" />
                                    <FormControlLabel value={2} control={<Radio />} label="Design" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box className="glass" p={3}>
                            <FormControl>
                                <FormLabel>Цвет опор</FormLabel>
                                <RadioGroup
                                    value={legsColor}
                                    onChange={(e) => setLegsColor(e.target.value)}
                                >
                                    <FormControlLabel value="#777777" control={<Radio />} label="Черный" />
                                    <FormControlLabel value="#ECECEC" control={<Radio />} label="Хром" />
                                    <FormControlLabel value="#C9BD71" control={<Radio />} label="Золото" />
                                    <FormControlLabel value="#C9A3B9" control={<Radio />} label="Розовое золото" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </>
                )}
            </Stack>
        </Box>
    );
};
